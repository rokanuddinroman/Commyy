import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function CreateCommunity() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);

  const handleCreate = async (e) => {
    e.preventDefault();
    const user = supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase.from("communities").insert([
      {
        name,
        description,
        created_by: user.id,
      },
    ]);

    if (error) setError(error.message);
    else {
      setName("");
      setDescription("");
    }
  };

  return (
    <form
      onSubmit={handleCreate}
      className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8"
    >
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Create Community
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Create a new community to connect with others sharing similar
            interests.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8">
            <div className="col-span-full">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Community Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Write a few sentences about your community.
              </p>
            </div>

            {/* <div className="col-span-full">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Cover photo
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon
                    className="mx-auto h-12 w-12 text-gray-300"
                    aria-hidden="true"
                  />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        onChange={(e) => setCoverPhoto(e.target.files[0])}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-4 mt-6">
          <div className="text-sm text-red-700">{error}</div>
        </div>
      )}

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
          onClick={() => {
            setName("");
            setDescription("");
            setCoverPhoto(null);
            setError(null);
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          //   disabled={loading}
          className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Create Community
        </button>
      </div>
    </form>
  );
}
// "use client";
// import { useState } from "react";
// import { supabase } from "../lib/supabase";
// import { PhotoIcon } from "@heroicons/react/24/solid";

// export default function CreateCommunity() {
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [coverPhoto, setCoverPhoto] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleCreate = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     const {
//       data: { user },
//     } = await supabase.auth.getUser();
//     if (!user) {
//       setError("You must be logged in to create a community");
//       setLoading(false);
//       return;
//     }

//     const { error: insertError } = await supabase.from("communities").insert([
//       {
//         name,
//         description,
//         created_by: user.id,
//       },
//     ]);

//     if (insertError) {
//       setError(insertError.message);
//     } else {
//       setName("");
//       setDescription("");
//       setCoverPhoto(null);
//     }
//     setLoading(false);
//   };

//   return (

//   );
// }
