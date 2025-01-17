import { useState } from "react";
import { useRouter } from "next/navigation";

const getFormData = async () => {
  const response = await fetch("/api/client", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

export const useGetForm = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      const data = await getFormData();
      setData(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to fetch data");
    }
  };

  return { data, error, fetchData };
};

const submitForm = async ({ formData }: { formData: FormData }) => {};

export const useSubmitForm = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const submit = async (formData: FormData) => {
    try {
      await submitForm({ formData });
      router.refresh();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to fetch data");
    }
  };

  return { submit, error };
};

const deleteFile = async ({ index }: { index: string }) => {
  const response = await fetch(
    `/api/client/additional-information?index=${index}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data;
};

export const useDeleteFile = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const deleteItem = async (index: string) => {
    try {
      await deleteFile({ index });
      router.refresh();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to fetch data");
    }
  };

  return { deleteItem, error };
};
