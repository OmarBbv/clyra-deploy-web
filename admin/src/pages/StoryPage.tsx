import { useMutation, useQuery } from "@tanstack/react-query"
import { Controller, useForm } from 'react-hook-form'
import { FormProvider } from 'react-hook-form'
// import z from 'zod'
// import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import MDEditor from '@uiw/react-md-editor';
import BASE_API from "@/utils/apiConfig";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";


// const formSchema = z.object({
//   title: z.string().min(2, {
//     message: "Başlık en az 2 karakter olmalıdır.",
//   }),
//   description: z.string().min(10, {
//     message: "Açıklama en az 10 karakter olmalıdır.",
//   }),
//   content: z.string().min(10, {
//     message: "İçerik en az 10 karakter olmalıdır.",
//   }),
//   lessonId: z.string().min(1, {
//     message: "Lütfen bir ders seçiniz.",
//   }),
//   image: z.string().min(1, {
//     message: "Lütfen bir resim URL'si giriniz.",
//   }),
// });


interface IFormValidation {
  title: string,
  description: string,
  content: string,
  tags: string,
  lessonId: string,
  images: string
}

interface ILesson {
  _id: string;
  name: string;
  description: string;
  images: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
  __v: number;
}

export default function StoryPage() {
  const stories = [
    { id: 1, title: "İlk MERN Uygulamam", description: "MERN stack ile ilk uygulamımı nasıl geliştirdim", tags: ["MERN", "React", "Node.js"], createdAt: new Date() },
    { id: 2, title: "MongoDB İpuçları", description: "MongoDB kullanırken dikkat edilmesi gerekenler", tags: ["MongoDB", "Database"], createdAt: new Date() },
  ]
  const [lessonId, setLessonId] = useState<string>('');

  const { data: lessons } = useQuery({
    queryKey: ['get/all-lesson'],
    queryFn: async () => {
      const res = await BASE_API.get('/lessons');
      console.log(res.data.data);
      return res.data.data
    }
  })

  const form = useForm<IFormValidation>({
    // resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
      tags: "",
      lessonId: lessonId,
      images: ""
    },
  })

  const mutate = useMutation({
    mutationKey: ['send/Story'],
    mutationFn: async (params: IFormValidation) => {
      const res = await BASE_API.post('/stories', params);
      return res.data;
    },
    onSuccess: () => {
      alert('Hikaye başarıyla oluşturuldu!');
      form.reset();
    },
    onError: (error: any) => {
      console.error('Bir hata oluştu:', error);
      alert('Bir hata oluştu, lütfen tekrar deneyin.');
    },
  });

  async function handlePostStory(values: IFormValidation) {
    console.log(values)
    mutate.mutate(values);
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Hikayeler</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Yeni Hikaye Oluştur</CardTitle>
          <CardDescription>Deneyimlerinizi ve öğrendiklerinizi paylaşın</CardDescription>
        </CardHeader>
        <CardContent>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(handlePostStory)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Başlık</FormLabel>
                    <FormControl>
                      <Input placeholder="Hikayenizin başlığı" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Açıklama</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Kısa bir açıklama" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Resim Yükle</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={e => {
                          const files = e.target.files;
                          if (files && files.length > 0) { 
                            const file = files[0];
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              field.onChange(reader.result); 
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Controller
                name="content"
                control={form.control}
                render={({ field }) => (
                  <MDEditor
                    value={field.value}
                    onChange={(val) => field.onChange(val || '')}
                    className="mb-4 w-full h-full"
                  />
                )}
              />
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Etiketler</FormLabel>
                    <FormControl>
                      <Input placeholder="Etiketleri virgülle ayırın" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lessonId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>İlgili Ders</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Ders Seçin" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {lessons?.map((lesson: ILesson) => (
                          <SelectItem
                            onClick={() => setLessonId(lesson._id)}
                            key={lesson._id} value={lesson._id}>
                            {lesson.name || "Ders Adı Mevcut Değil"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">Hikaye Paylaş</Button>
            </form>
          </FormProvider>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold mb-4">Paylaşılan Hikayeler</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stories.map((story) => (
          <Card key={story.id}>
            <CardHeader>
              <CardTitle>{story.title}</CardTitle>
              <CardDescription>{story.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                {story.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">{tag}</Badge>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                {story.createdAt.toLocaleDateString()}
              </p>
            </CardContent>
            <CardFooter>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Detayları Gör</Button>
                </DialogTrigger>
                <DialogContent className="max-w-[800px] w-[90vw]">
                  <DialogHeader>
                    <DialogTitle>{story.title}</DialogTitle>
                    <DialogDescription>{story.description}</DialogDescription>
                  </DialogHeader>
                  <ScrollArea className="max-h-[60vh] mt-4">
                    <div className="prose dark:prose-invert">
                      <p>Hikaye içeriği burada gösterilecek...</p>
                    </div>
                  </ScrollArea>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}