import { useState, useEffect, FC, SVGProps } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Book, Users, DollarSign, TrendingUp } from "lucide-react"

interface Course {
  id: number;
  name: string;
  instructor: string;
  enrollments: number;
}

interface Student {
  id: number;
  name: string;
  email: string;
  joinDate: string;
}

interface Revenue {
  name: string;
  revenue: number;
}


const Home = () => {
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalStudents: 0,
    totalRevenue: 0,
    growthRate: 0
  })

  const [recentCourses, setRecentCourses] = useState<Course[]>([]);
  const [recentStudents, setRecentStudents] = useState<Student[]>([]);
  const [revenueData, setRevenueData] = useState<Revenue[]>([]);

  useEffect(() => {
    setStats({
      totalCourses: 25,
      totalStudents: 5000,
      totalRevenue: 100000,
      growthRate: 15
    })

    setRecentCourses([
      { id: 1, name: "Advanced React Patterns", instructor: "Jane Doe", enrollments: 120 },
      { id: 2, name: "MongoDB Performance Tuning", instructor: "John Smith", enrollments: 85 },
      { id: 3, name: "Node.js Microservices", instructor: "Alice Johnson", enrollments: 95 }
    ])

    setRecentStudents([
      { id: 1, name: "Emily Brown", email: "emily@example.com", joinDate: "2023-06-15" },
      { id: 2, name: "Michael Lee", email: "michael@example.com", joinDate: "2023-06-14" },
      { id: 3, name: "Sarah Davis", email: "sarah@example.com", joinDate: "2023-06-13" }
    ])

    setRevenueData([
      { name: 'Ocak', revenue: 4000 },
      { name: 'Şubat', revenue: 3000 },
      { name: 'Mart', revenue: 5000 },
      { name: 'Nisan', revenue: 4500 },
      { name: 'Mayıs', revenue: 6000 },
      { name: 'Haziran', revenue: 5500 },
    ])
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Paneli</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard icon={Book} title="Toplam Kurs" value={stats.totalCourses} />
        <StatCard icon={Users} title="Toplam Öğrenci" value={stats.totalStudents} />
        <StatCard icon={DollarSign} title="Toplam Gelir" value={`$${stats.totalRevenue.toLocaleString()}`} />
        <StatCard icon={TrendingUp} title="Büyüme Oranı" value={`${stats.growthRate}%`} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Son Eklenen Kurslar</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Kurs Adı</TableHead>
                  <TableHead>Eğitmen</TableHead>
                  <TableHead>Kayıtlar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentCourses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell>{course.name}</TableCell>
                    <TableCell>{course.instructor}</TableCell>
                    <TableCell>{course.enrollments}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Son Kayıt Olan Öğrenciler</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>İsim</TableHead>
                  <TableHead>E-posta</TableHead>
                  <TableHead>Kayıt Tarihi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{student.joinDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Aylık Gelir</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4 lg:justify-between flex-wrap">
        <Button>Yeni Kurs Ekle</Button>
        <Button>Tüm Öğrencileri Görüntüle</Button>
        <Button>Gelir Raporunu İndir</Button>
      </div>
    </div>
  )
}

const StatCard = ({ icon: Icon, title, value }: { icon: FC<SVGProps<SVGSVGElement>>, title: string, value: any }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
    </CardContent>
  </Card>
)

export default Home