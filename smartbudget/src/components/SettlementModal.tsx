import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  Check,
  CreditCard,
  Smartphone,
  Landmark,
  Wallet,
  User,
} from "lucide-react";
import type { Group, GroupMember } from "@/types/group";

interface SettlementModalProps {
  isOpen: boolean;
  onClose: () => void;
  group: Group | null;
  onSettle: (memberId: string, paymentMethod: string) => void;
}

export default function SettlementModal({
  isOpen,
  onClose,
  group,
  onSettle,
}: SettlementModalProps) {
  const { t } = useLanguage();
  const [selectedMember, setSelectedMember] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  // Reset state when modal opens or group changes
  useState(() => {
    if (isOpen && group) {
      setSelectedMember("");
      setPaymentMethod("");
    }
  });

  const handleSubmit = () => {
    if (!selectedMember || !paymentMethod) {
      toast.error(t("Please select a member and payment method"));
      return;
    }

    setIsLoading(true);

    // Simulate payment processing
    setTimeout(() => {
      try {
        onSettle(selectedMember, paymentMethod);
        onClose();
        toast.success(t("Payment settled successfully"));
      } catch (error) {
        toast.error(t("Payment failed. Please try again."));
      } finally {
        setIsLoading(false);
      }
    }, 1000);
  };

  // Get unpaid members
  const unpaidMembers = group
    ? group.members.filter((member) => !member.paid)
    : [];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {t("Settle Payment")} - {group?.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <p className="text-sm text-muted-foreground">
            {t("Select a member and payment method to settle their share")}
          </p>

          <div className="space-y-1.5">
            <h3 className="text-sm font-medium">{t("Select Member")}</h3>
            <div className="space-y-2">
              {unpaidMembers.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  {t("All members have paid")}
                </p>
              ) : (
                unpaidMembers.map((member) => (
                  <div
                    key={member.id}
                    className={`flex items-center justify-between p-2 rounded-md cursor-pointer border ${
                      selectedMember === member.id
                        ? "border-primary bg-primary/5"
                        : "border-border"
                    }`}
                    onClick={() => setSelectedMember(member.id)}
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                        <User className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Intl.NumberFormat("en-IN", {
                            style: "currency",
                            currency: "INR",
                          }).format(member.amount)}
                        </p>
                      </div>
                    </div>

                    {selectedMember === member.id && (
                      <Check className="h-4 w-4 text-primary" />
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <h3 className="text-sm font-medium">{t("Payment Method")}</h3>
            <Select
              value={paymentMethod}
              onValueChange={setPaymentMethod}
              disabled={unpaidMembers.length === 0}
            >
              <SelectTrigger>
                <SelectValue placeholder={t("Select payment method")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="credit_card">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    <span>{t("Credit Card")}</span>
                  </div>
                </SelectItem>
                <SelectItem value="upi">
                  <div className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4" />
                    <span>{t("UPI")}</span>
                  </div>
                </SelectItem>
                <SelectItem value="bank_transfer">
                  <div className="flex items-center gap-2">
                    <Landmark className="h-4 w-4" />
                    <span>{t("Bank Transfer")}</span>
                  </div>
                </SelectItem>
                <SelectItem value="digital_wallet">
                  <div className="flex items-center gap-2">
                    <Wallet className="h-4 w-4" />
                    <span>{t("Digital Wallet")}</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            {t("Cancel")}
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!selectedMember || !paymentMethod || isLoading}
          >
            {isLoading ? t("Processing...") : t("Settle")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
