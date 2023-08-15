import React from "react";

export default function UserProfilePage({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>User Profile</h1>
      <hr />
      <p className="text-4xl text-yellow-500">
        User Profile Page
        <span className="p-2 rounded bg-orange-500 ml-2 text-black">
          {params.id}
        </span>
      </p>
    </div>
  );
}
