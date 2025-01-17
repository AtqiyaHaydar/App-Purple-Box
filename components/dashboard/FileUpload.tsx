import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FileUpIcon, X } from "lucide-react";
import { FaFileUpload } from "react-icons/fa";
import { toast } from "@/hooks/use-toast";
import { uploadFile } from "@/app/actions/additional-information";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function FileUpload() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();
  const t = useTranslations();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setSelectedFiles((prev) => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    maxSize: 10485760, // 10MB
    accept: {
      "application/pdf": [".pdf"],
      "image/*": [".png", ".jpg", ".jpeg"],
    },
  });

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;

    try {
      setIsUploading(true);
      const formData = new FormData();

      selectedFiles.forEach((file, index) => {
        formData.append(`files`, file);
      });

      await uploadFile(formData);

      setSelectedFiles([]);

      router.refresh();
      toast({
        title: "Success",
        description: `${selectedFiles.length} files uploaded successfully`,
      });
    } catch (error) {
      console.error(error instanceof Error ? error.message : "Upload failed");
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Upload failed",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 transition-colors min-h-[200px] flex justify-center items-center",
          isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col h-full w-full items-center gap-4">
          {selectedFiles.length > 0 ? (
            <>
              <div className="w-full space-y-2">
                {selectedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 border rounded-lg border-gray-100 "
                  >
                    <span className="text-sm">{file.name}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile(index);
                      }}
                      className="p-1 hover:bg-gray-200 rounded"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm text-gray-500">
                  {t("additionalInfo.upload.dropMoreFiles")}
                </p>
              </div>
            </>
          ) : isDragActive ? (
            <p>{t("additionalInfo.upload.dropFiles")}</p>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <FaFileUpload className="w-12 h-12" />

              <p>{t("additionalInfo.upload.dragAndDropFiles")}</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={handleUpload}
          disabled={isUploading || selectedFiles.length <= 0}
          className="bg-primary-purple w-full"
          loading={isUploading}
        >
          {t("common.submit")}
        </Button>
      </div>
    </div>
  );
}
