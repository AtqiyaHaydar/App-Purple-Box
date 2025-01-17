"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useFormState } from "@/hooks/useFormState";
import { LinkSection } from "@/components/LinkSection";
import { Chatbot, Client, Link } from "@/types/Form";
import { updateLinks } from "@/app/actions/link";
import { useTranslations } from "next-intl";
import { toast } from "@/hooks/use-toast";

interface LinksAndPromptsPageProps {
  initialData?: {
    links: Link[];
    store: string;
  } & Chatbot;
}

export default function LinksAndPromptsPage({
  initialData,
}: LinksAndPromptsPageProps) {
  const t = useTranslations();

  console.log("inih tial", initialData);

  const { links, setLinks, handleLinkChange, handleAddLink, handleDeleteLink } =
    useFormState(initialData?.store as string);

  const [additionalPrompt, setAdditionalPrompt] = useState(
    initialData?.additional_prompt || ""
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const linkTypes = useMemo(() => {
    switch (initialData?.store) {
      case "https://www.impermeo.it":
        return ["order"];
      case "https://www.startwithyou.es":
        return ["acquisition"];
      case "https://nspireagency.com":
      case "https://inspiraagency.es":
        return ["kit_digital", "kit_consulting", "services"];
      default:
        return [
          "refund",
          "exchange",
          "return",
          "issues",
          "payment_policy",
          "order_modification",
        ];
    }
  }, [initialData?.store]);

  useEffect(() => {
    if (!initialData) return;

    const existingLinks = initialData.links || [];

    const finalLinks = linkTypes
      .map((type) => {
        const typeLinks = existingLinks.filter(
          (link) => link.link_type === type
        );
        return typeLinks.length
          ? typeLinks
          : [{ link_type: type, locale: "", url: "" }];
      })
      .flat();

    setLinks(finalLinks);
  }, [initialData, linkTypes]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const hasUncompleteLinks = links.some(
      (link) => (!link.url && link.locale) || (link.url && !link.locale)
    );

    if (hasUncompleteLinks) {
      toast({
        title: " Error",
        description: t("common.error.uncompleteLinks"),
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      const formData = {
        links,
        additionalPrompt,
      };

      await updateLinks(formData);
      toast({
        title: "Success",
        description: "Links updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full bg-transparent text-white border-none">
      <CardHeader>
        <CardTitle className="text-2xl">{t("linksAndPrompts.title")}</CardTitle>
        <CardDescription>{t("linksAndPrompts.description")}</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="grid items-center w-full gap-4">
            {linkTypes?.map((link, index) => (
              <LinkSection
                key={index}
                label={t(`linksAndPrompts.sections.${link}`)}
                type={link as string}
                links={links.filter((l) => l.link_type === link)}
                onLinkChange={handleLinkChange}
                onAddLink={handleAddLink}
                onDeleteLink={handleDeleteLink}
              />
            ))}

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="prompt">
                {t("linksAndPrompts.fields.prompt.label")}
              </Label>
              <Textarea
                id="prompt"
                value={additionalPrompt}
                onChange={(e) => setAdditionalPrompt(e.target.value)}
                placeholder={t("linksAndPrompts.fields.prompt.placeholder")}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="w-full bg-primary-purple"
            loading={isSubmitting}
          >
            {t("linksAndPrompts.buttons.submit")}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
