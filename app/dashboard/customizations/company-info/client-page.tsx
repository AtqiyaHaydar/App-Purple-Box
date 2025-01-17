"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sectors } from "@/constants/sectors";
import { validateAndResizeImage } from "@/lib/imageUtils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { updateClient } from "@/app/actions/client";
import { Client, ClientUpdate, Whatsapp } from "@/types/Form";
import { useRouter } from "next/navigation";

interface CompanyInfoPageProps {
  initialData?: ClientUpdate;
}

// const parseEmails = (
//   emails: string | Array<{ email?: string; label?: string }>
// ) => {
//   if (typeof emails === "string") {
//     try {
//       return JSON.parse(emails);
//     } catch {
//       return [{ email: "", label: "" }];
//     }
//   }
//   return emails || [{ email: "", label: "" }];
// };

export default function CompanyInfoPage({ initialData }: CompanyInfoPageProps) {
  const t = useTranslations();
  const router = useRouter();

  const [formData, setFormData] = useState<Partial<ClientUpdate>>({
    name: initialData?.name || "",
    custom_domain: initialData?.custom_domain || "",
    vertical: initialData?.vertical || "",
    human_contact: initialData?.human_contact || "",
    about: initialData?.about || "",
    address: initialData?.address || "",
    // emails: [{ email: "", label: "" }],
    prefilled_message: initialData?.prefilled_message || "",
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState(initialData?.image_url || "");
  const [isUpdating, setIsUpdating] = useState(false);

  const toast = useToast();

  const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      try {
        const processedImage = await validateAndResizeImage(file);
        setLogoFile(processedImage);

        setLogoPreview(URL.createObjectURL(processedImage));
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // const handleEmailChange = (
  //   index: number,
  //   field: "email" | "label",
  //   value: string
  // ) => {
  //   setFormData((prev) => {
  //     const updatedEmails = [...prev.emails];
  //     updatedEmails[index] = { ...updatedEmails[index], [field]: value };
  //     return { ...prev, emails: updatedEmails };
  //   });
  // };

  // const handleAddEmail = () => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     emails: [...prev.emails, { email: "", label: "" }],
  //   }));
  // };

  // const handleDeleteEmail = (index: number) => {
  //   setFormData((prev) => {
  //     const updatedEmails = prev.emails.filter(
  //       (_: unknown, i: number) => i !== index
  //     );
  //     return {
  //       ...prev,
  //       emails: updatedEmails.length
  //         ? updatedEmails
  //         : [{ email: "", label: "" }],
  //     };
  //   });
  // };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      setIsUpdating(true);

      if (logoFile) {
        const form = new FormData();
        form.append("logoFile", logoFile);
        await updateClient(formData, form);
      } else {
        await updateClient(formData);
      }
      router.refresh();
      toast.toast({
        title: t("common.success.title"),
        description: t("common.success.companyInfo"),
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="w-screen md:w-[75vw] 2xl:w-[80vw] bg-transparent text-white border-none">
        <CardHeader>
          <CardTitle className="text-2xl">{t("companyInfo.title")}</CardTitle>
          <CardDescription>{t("companyInfo.description")}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col space-y-1.5">
            {logoPreview && (
              <div className="mt-2">
                <Avatar className="w-24 h-24">
                  <AvatarImage
                    sizes="xl"
                    src={logoPreview}
                    alt={t("companyInfo.logo.preview")}
                  />
                  <AvatarFallback>PB</AvatarFallback>
                </Avatar>
              </div>
            )}
            <Label htmlFor="logo-upload" className="underline cursor-pointer">
              {t("companyInfo.logo.label")}
            </Label>
            <Input
              id="logo-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleLogoChange}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">
              {t("companyInfo.fields.chatbotName.label")}
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder={t("companyInfo.fields.chatbotName.placeholder")}
            />
          </div>

          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="custom_domain">
              {t("companyInfo.fields.customDomain.label")}
            </Label>
            <Input
              id="custom_domain"
              value={formData.custom_domain as string}
              onChange={handleInputChange}
              placeholder={t("companyInfo.fields.customDomain.placeholder")}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="human_contact">
              {t("companyInfo.fields.humanContact.label")}
            </Label>
            <Input
              id="human_contact"
              value={formData.human_contact as string}
              onChange={handleInputChange}
              placeholder={t("companyInfo.fields.humanContact.placeholder")}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="prefilled_message">
              {t("companyInfo.fields.prefilled.label")}
            </Label>
            <Textarea
              id="prefilled_message"
              value={formData.prefilled_message as string}
              onChange={handleInputChange}
              placeholder={t("companyInfo.fields.prefilled.placeholder")}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="about">{t("companyInfo.fields.about.label")}</Label>
            <Textarea
              id="about"
              value={formData.about as string}
              onChange={handleInputChange}
              placeholder={t("companyInfo.fields.about.placeholder")}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="address">
              {t("companyInfo.fields.address.label")}
            </Label>
            <Textarea
              id="address"
              value={formData.address as string}
              onChange={handleInputChange}
              placeholder={t("companyInfo.fields.address.placeholder")}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="sector">
              {t("companyInfo.fields.sector.label")}
            </Label>
            <Select
              defaultValue={formData.vertical as string}
              onValueChange={(newSector) =>
                setFormData((prev) => ({ ...prev, vertical: newSector }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder={t("companyInfo.fields.sector.placeholder")}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>
                    {t("companyInfo.fields.sector.label")}
                  </SelectLabel>
                  {sectors.map((sector) => (
                    <SelectItem key={sector.code} value={sector.value}>
                      {t(`companyInfo.fields.sector.sectors.${sector.code}`)}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {/* <div className="flex flex-col space-y-5">
            <Label htmlFor="emails">
              {t("companyInfo.fields.emails.label")}
            </Label>
            {formData.emails.map(
              (email: { email: string; label: string }, index: number) => (
                <div key={index} className="flex flex-row items-end gap-2">
                  <div className="flex flex-col w-1/2 gap-1">
                    <Label htmlFor="label">Label</Label>
                    <Input
                      type="text"
                      id="label"
                      className="w-full"
                      value={email.label}
                      onChange={(e) =>
                        handleEmailChange(index, "label", e.target.value)
                      }
                      placeholder={"Label"}
                    />
                  </div>
                  <div className="flex flex-col w-full gap-1">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email.email}
                      onChange={(e) =>
                        handleEmailChange(index, "email", e.target.value)
                      }
                      placeholder={t("companyInfo.fields.emails.placeholder")}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    className="px-3 border  h-[2.25rem] hover:bg-destructive hover:text-destructive-foreground text-destructive"
                    onClick={() => handleDeleteEmail(index)}
                  >
                    <TrashIcon className="w-5 h-5" />
                  </Button>
                </div>
              )
            )}
            <Button
              type="button"
              className="self-end w-fit"
              onClick={handleAddEmail}
            >
              <PlusIcon className="w-5 h-5" />
            </Button>
          </div> */}
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="w-full bg-primary-purple"
            loading={isUpdating}
          >
            {t("common.submit")}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
