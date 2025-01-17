// hooks/useFormState.ts
import { Link } from "@/types/Form";
import { useState, useEffect } from "react";
import { toast } from "./use-toast";
import { deleteLink } from "@/app/actions/link";

export const useFormState = (store: string) => {
  const [links, setLinks] = useState<Partial<Link>[]>([]);

  const handleLinkChange = (
    linkType: string,
    locale: string,
    field: keyof Link,
    value: string
  ) => {
    setLinks((prev) => {
      return prev.map((link) => {
        if (link.link_type === linkType && link.locale === locale) {
          return { ...link, [field]: value };
        }
        return link;
      });
    });
  };

  const handleAddLink = (linkType: string) => {
    setLinks((prev) => [...prev, { link_type: linkType, locale: "", url: "" }]);
  };

  const handleDeleteLink = async (
    linkType: string,
    locale: string,
    id: string
  ) => {
    console.log(linkType, locale, id);
    try {
      if (id) await deleteLink(id);
      setLinks((prev) => {
        const test = prev.filter(
          (link) => !(link.link_type === linkType && link.locale === locale)
        );
        console.log(test);
        return test;
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
      });
    }
  };

  return {
    links,
    setLinks,
    handleLinkChange,
    handleAddLink,
    handleDeleteLink,
  };
};
