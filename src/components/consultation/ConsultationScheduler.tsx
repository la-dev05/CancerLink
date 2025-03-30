import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileUp, Clock } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  doctorName: string;
  consultationFee: string;
}

const timeSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "02:00 PM", "02:30 PM",
  "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM"
];

const ConsultationScheduler = ({ isOpen, onClose, doctorName, consultationFee }: Props) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [files, setFiles] = useState<FileList | null>(null);

  const handleSchedule = () => {
    // Handle scheduling logic here
    console.log({ selectedDate, selectedTime, files });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Schedule Consultation with {doctorName}</DialogTitle>
          <DialogDescription>
            Consultation fee: {consultationFee}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="rounded-lg border p-4">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="w-full"
                disabled={(date) => date < new Date() || date > new Date(Date.now() + 12096e5)} // 14 days from now
              />
            </div>

            <ScrollArea className="h-[200px] rounded-lg border p-4">
              <div className="grid grid-cols-2 gap-2">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    className="w-full"
                    onClick={() => setSelectedTime(time)}
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    {time}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>

          <div className="space-y-4">
            <div className="rounded-lg border p-4">
              <Label htmlFor="files">Upload Medical Reports (Optional)</Label>
              <div className="mt-2 grid gap-4">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="reports">Previous consultation reports, lab tests etc.</Label>
                  <Input
                    id="reports"
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => setFiles(e.target.files)}
                  />
                </div>
                {files && (
                  <div className="text-sm text-muted-foreground">
                    {Array.from(files).map((file, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <FileUp className="h-4 w-4" />
                        {file.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <Button
              className="w-full"
              disabled={!selectedDate || !selectedTime}
              onClick={handleSchedule}
            >
              Schedule Consultation
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConsultationScheduler;
