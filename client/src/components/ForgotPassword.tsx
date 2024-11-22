import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { MoveLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (step === 1) {
      try {
        const response = await axios.post("http://localhost:9000/api/users/forgot-password", { email });
        setGeneratedCode(response.data.verificationCode);
        console.log(response.data)
        setStep(step + 1);
      } catch (error) {
        console.error("Kod gönderilemedi:", error);
      }
    } else if (step === 2) {
      // Step 2: Verify code
      if (verificationCode === generatedCode) {
        setStep(step + 1);
      } else {
        console.error("Geçersiz doğrulama kodu");
      }
    } else if (step === 3) {
      // Step 3: Reset password
      try {
        await axios.post("/api/users/reset-password", { email, newPassword });
        console.log("Şifre başarıyla değiştirildi");
        navigate('/login'); // Redirect to login page
      } catch (error) {
        console.error("Şifre değiştirilemedi:", error);
      }
    }
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center">
      <Button
        onClick={() => navigate('/login')}
        variant="ghost"
        className="absolute top-3 left-3"
      >
        <MoveLeft className="text-sm cursor-pointer" />
      </Button>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Şifremi Unuttum</CardTitle>
          <CardDescription>
            {step === 1 && "E-posta adresinizi girin"}
            {step === 2 && "Doğrulama kodunu girin"}
            {step === 3 && "Yeni şifrenizi belirleyin"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Progress value={(step / 3) * 100} className="w-full" />
            </div>
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="email"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <Label htmlFor="email">E-posta</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ornek@email.com"
                    required
                  />
                </motion.div>
              )}
              {step === 2 && (
                <motion.div
                  key="verification"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <Label htmlFor="verificationCode">Doğrulama Kodu</Label>
                  <Input
                    id="verificationCode"
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    placeholder="6 haneli kod"
                    required
                  />
                </motion.div>
              )}
              {step === 3 && (
                <motion.div
                  key="newPassword"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <Label htmlFor="newPassword">Yeni Şifre</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Yeni şifreniz"
                    required
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </CardContent>
        <CardFooter>
          <Button type="submit" onClick={handleSubmit} className="w-full">
            {step === 1 && "Kod Gönder"}
            {step === 2 && "Doğrula"}
            {step === 3 && "Şifreyi Değiştir"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
