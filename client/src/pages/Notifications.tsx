import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Bell, Check, Inbox } from "lucide-react"
import { Button } from "@/components/ui/button"
import PageMeta from '@/components/PageMeta'
import { useQuery } from '@tanstack/react-query'
import BASE_API from '@/utils/apiConfig'
import LoadingErrorStates from '@/components/LoadingErrorStates'

interface INotification {
  _id: string;
  userId: string;
  title: string,
  message: string;
  read: boolean;
  createdAt: string;
  __v: number;
}

async function handleFetchNotifications() {
  try {
    const res = await BASE_API.get('/notifications');
    return res.data
  } catch (error: any) {
    throw new Error(error);
  }
}

export default function Notifications() {

  const { data: notifications, isLoading, isError } = useQuery<INotification[]>({
    queryKey: ['get/notifications'],
    queryFn: handleFetchNotifications
  })

  if (isLoading || isError) return <LoadingErrorStates isError={isError} isLoading={isLoading} />

  return (
    <div className="container mx-auto py-10">
      <PageMeta title='Bildirimler' />
      <Card className="w-full max-w-6xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <Bell className="h-6 w-6" />
            Bildirimler
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px] w-full pr-4">
            {
              notifications &&
                notifications.length > 0 ?
                notifications?.map((notification) => (
                  <div
                    key={notification._id}
                    className={`mb-4 p-4 rounded-lg transition-colors ${notification.read ? 'bg-background' : 'bg-primary/10 dark:bg-primary/20'
                      }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold">{notification?.title}</h3>
                      <Badge variant={notification.read ? "secondary" : "default"}>
                        {notification.read ? "Okundu" : "Yeni"}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-2">{notification?.message}</p>
                    <div className="flex justify-between items-center text-sm text-muted-foreground">
                      <span>{notification?.createdAt}</span>
                      {!notification?.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          // onClick={() => markAsRead(notification.id)}
                          className="flex items-center gap-1 hover:text-primary"
                        >
                          <Check className="h-4 w-4" />
                          Okundu olarak işaretle
                        </Button>
                      )}
                    </div>
                  </div>
                ))
                :
                <div className="flex flex-col items-center justify-center h-full text-center p-4">
                  <div className="bg-muted rounded-full p-3 mb-4">
                    <Inbox className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Bildiriminiz Bulunmuyor</h3>
                  <p className="text-muted-foreground mb-4">
                    Şu anda herhangi bir bildiriminiz yok. Yeni bildirimler geldiğinde burada görüntülenecektir.
                  </p>
                  <Button
                    variant="outline"
                    className="gap-2"
                  >
                    <Bell className="h-4 w-4" />
                    Bildirimleri Kontrol Et
                  </Button>
                </div>
            }
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}