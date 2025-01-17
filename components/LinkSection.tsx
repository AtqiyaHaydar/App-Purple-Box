// components/LinkSection.tsx
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { countries } from "@/constants/countries";
import { PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import { Link } from "@/types/Form";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

interface LinkSectionProps {
  label: string;
  type: string;
  links: Partial<Link>[];
  onLinkChange: (
    linkType: string,
    locale: string,
    field: keyof Link,
    value: string
  ) => void;
  onAddLink: (type: string) => void;
  onDeleteLink: (linkType: string, locale: string, id: string) => void;
}

export const LinkSection = ({
  label,
  type,
  links,
  onLinkChange,
  onAddLink,
  onDeleteLink,
}: LinkSectionProps) => {
  const t = useTranslations();

  const typeLinks = links.filter((link) => link.link_type === type);
  const isEmptyLink = (link: Partial<Link>) => !link.url || !link.locale;
  const hasEmptyLink = useMemo(() => typeLinks.some(isEmptyLink), [links]);
  const usedLanguages = useMemo(
    () => typeLinks.map((link) => link.locale),
    [links]
  );

  return (
    <div className="flex flex-col space-y-1.5">
      <Label>{label}</Label>
      {links
        ?.filter((link) => link.link_type === type)
        .map((link, index) => (
          <div key={index} className="flex flex-row items-center ">
            <Select
              value={link.locale as string}
              onValueChange={(newCountry) =>
                onLinkChange(
                  link.link_type as string,
                  link.locale as string,
                  "locale",
                  newCountry
                )
              }
            >
              <SelectTrigger className="rounded-r-none w-[150px]">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>
                    {t(`linksAndPrompts.fields.placeholders.language`)}
                  </SelectLabel>
                  {countries.map((country) => (
                    <SelectItem
                      key={country.code}
                      value={country.code}
                      disabled={usedLanguages.includes(country.code)}
                    >
                      {t(`linksAndPrompts.fields.countries.${country.code}`)}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="flex items-center flex-1">
              <Input
                type="text"
                className="rounded-l-none rounded-r-none"
                value={link.url || ""}
                onChange={(e) =>
                  onLinkChange(
                    link.link_type as string,
                    link.locale as string,
                    "url",
                    e.target.value
                  )
                }
              />
              <Button
                type="button"
                variant="ghost"
                className="px-3 border rounded-l-none h-[2.25rem] hover:bg-destructive hover:text-destructive-foreground text-destructive"
                onClick={() =>
                  onDeleteLink(
                    link.link_type as string,
                    link.locale as string,
                    link.id as string
                  )
                }
                disabled={isEmptyLink(link) || links.length == 1}
              >
                <TrashIcon className="w-5 h-5" />
              </Button>
            </div>
          </div>
        ))}
      <Button
        type="button"
        className="self-end w-fit"
        onClick={() => onAddLink(type)}
        disabled={hasEmptyLink}
      >
        <PlusIcon className="w-5 h-5" />
      </Button>
    </div>
  );
};
