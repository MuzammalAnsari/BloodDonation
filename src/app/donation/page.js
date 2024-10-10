"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import DonorForm from "@/components/layout/DonorForm";

function DonationPage() {
  const session = useSession();
  // const [userName, setUserName] = useState("");
  const [user, setUser] = useState();
  const { status } = session;
 

  useEffect(() => {
    // if (session?.user?.name) {
      // setUserName(session.user.name);
      fetch("api/donorProfile").then((response) => {
        response.json().then((data) => {
          setUser(data);
        });
      });
    // }
  }, [session]);


  const handleSubmit = async (ev, data) => {
    ev.preventDefault();
    const donorPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/donorProfile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const data = await response.json();
        resolve(data);
      } else {
        reject(response);
      }
    });
    await toast.promise(donorPromise, {
      loading: "Saving...",
      success: "Saved!",
      error: "Failed to save",
    });
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 border mt-8 max-w-screen-md">
      <DonorForm  user={user} onSave={handleSubmit}/>
    </div>
  );
}

export default DonationPage;
