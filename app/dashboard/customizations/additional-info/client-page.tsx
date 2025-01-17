"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { TrashIcon } from "@radix-ui/react-icons";
import FileUpload from "@/components/dashboard/FileUpload";
import { Client } from "@/types/Form";
import { deleteFile } from "@/app/actions/additional-information";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

interface AdditionalInfoPageProps {
  initialData?: Client;
}

interface AdditionalInfo {
  title: string;
}

export default function AdditionalInfoPage({
  initialData,
}: AdditionalInfoPageProps) {
  const t = useTranslations();
  const router = useRouter();

  const additionalInfo = JSON.stringify(
    initialData?.additional_informations as string
  );

  async function handleDelete(index: string) {
    try {
      await deleteFile(index);
      router.refresh();
      t;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete file",
        variant: "destructive",
      });
    }
  }

  return (
    <Card className="w-screen md:w-[75vw] 2xl:w-[80vw] bg-transparent border-none text-white ">
      <CardHeader>
        <CardTitle className="text-2xl">{t("additionalInfo.title")}</CardTitle>
        <CardDescription>{t("additionalInfo.description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2 space-y-1.5">
          <Label htmlFor="pdf-upload">{t("additionalInfo.upload.label")}</Label>
          <FileUpload />
        </div>
        <div className="flex flex-col gap-3 mt-5">
          <h2 className="text-lg font-semibold">
            {t("additionalInfo.fileList.title")}
          </h2>
          {(
            (JSON.parse(additionalInfo as string) || []) as AdditionalInfo[]
          ).map((info: { title: string }, index: number) => (
            <div
              key={index}
              className="flex justify-between px-3 py-1 border rounded-xl border-zinc-50"
            >
              <div className="flex items-center gap-3 text-sm">
                <span>{index + 1}.</span>
                <p>{info.title}</p>
              </div>
              <Button
                type="button"
                variant="ghost"
                className="px-3 hover:bg-destructive hover:text-destructive-foreground text-destructive"
                onClick={() => handleDelete(index.toString())}
              >
                <TrashIcon className="w-5 h-5" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
