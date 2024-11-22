import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useMutation } from '@tanstack/react-query'
import BASE_API from '@/utils/apiConfig'
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Trash2, Edit, Eye, Plus } from 'lucide-react'

interface Lesson {
    id: number
    name: string
    description: string
    images: string
}

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Ders adı en az 2 karakter olmalıdır.",
    }),
    description: z.string().min(10, {
        message: "Açıklama en az 10 karakter olmalıdır.",
    }),
    images: z.string().optional(),
})

type IFormValues = z.infer<typeof formSchema>

export default function LessonPage() {

    const form = useForm<IFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            images: "",
        },
    })

    const mutate = useMutation({
        mutationKey: ['post/lessons'],
        mutationFn: async (params: IFormValues) => {
            try {
                const res = await BASE_API.post("/lessons/post", params);
                console.log(res.data);
                return res.data
            } catch (error: unknown) {
                console.log(error);
            }
        }
    })

    async function handlePostLesson(params: IFormValues) {
        console.log(params);
        mutate.mutate(params);
    }


    return (
        <div className="container mx-auto p-4 space-y-8">
            <h1 className="text-3xl font-bold">Ders Yönetimi</h1>

            <Card>
                {/* <CardHeader>
                    <CardTitle>{editingLesson ? "Dersi Düzenle" : "Yeni Ders Ekle"}</CardTitle>
                </CardHeader> */}
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handlePostLesson)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Ders Adı</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Dersin adı" {...field} />
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
                                            <Textarea placeholder="Ders açıklaması" {...field} />
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
                                        <FormLabel>Görsel Yükle</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0]
                                                    if (file) {
                                                        const reader = new FileReader()
                                                        reader.onloadend = () => {
                                                            field.onChange(reader.result as string)
                                                        }
                                                        reader.readAsDataURL(file)
                                                    }
                                                }}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Ders için bir görsel yükleyin (isteğe bağlı).
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full">
                                {/* {editingLesson ? "Güncelle" : "Ders Ekle"} */}
                                Ders Ekle
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            {/* <Card>
        <CardHeader>
          <CardTitle>Mevcut Dersler</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ders Adı</TableHead>
                <TableHead>Açıklama</TableHead>
                <TableHead className="text-right">İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lessons.map((lesson) => (
                <TableRow key={lesson.id}>
                  <TableCell className="font-medium">{lesson.name}</TableCell>
                  <TableCell>{lesson.description}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="icon">
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">Detayları Gör</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{lesson.name}</DialogTitle>
                            <DialogDescription>{lesson.description}</DialogDescription>
                          </DialogHeader>
                          {lesson.images && (
                            <img src={lesson.images} alt={lesson.name} className="w-full h-auto mt-4 rounded-md" />
                          )}
                        </DialogContent>
                      </Dialog>
                      <Button variant="outline" size="icon" onClick={() => editLesson(lesson)}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Düzenle</span>
                      </Button>
                      <Button variant="destructive" size="icon" onClick={() => deleteLesson(lesson.id)}>
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Sil</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card> */}
        </div>
    )
}