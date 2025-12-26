import mongoose from "mongoose";

const heroSchema = new mongoose.Schema(
  {
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
      unique: true, // one hero per admin
    },

    badgeText: { type: String, default: "" },
    title: { type: String, default: "" },
    highlightText: { type: String, default: "" },
    description: { type: String, default: "" },

    buttonPrimary: { type: String, default: "" },
    buttonSecondary: { type: String, default: "" },

    phone: { type: String, default: "" },
    email: { type: String, default: "" },
    location: { type: String, default: "" },

    stats: [
      {
        value: { type: String },
        label: { type: String },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Hero", heroSchema);



// // redux/apis/heroApi.js
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const heroApi = createApi({
//   reducerPath: "heroApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/hero`,
//     credentials: "include",
//   }),
//   tagTypes: ["Hero"],

//   endpoints: (builder) => ({
//     // 🌍 PUBLIC
//     getPublicHero: builder.query({
//       query: (slug) => `/public/${slug}`,
//     }),

//     // 🔐 ADMIN
//     getAdminHero: builder.query({
//       query: () => "/admin",
//       providesTags: ["Hero"],
//     }),

//     saveHero: builder.mutation({
//       query: (data) => ({
//         url: "/",
//         method: "POST",
//         body: data,
//       }),
//       invalidatesTags: ["Hero"],
//     }),

//     deleteHero: builder.mutation({
//       query: () => ({
//         url: "/",
//         method: "DELETE",
//       }),
//       invalidatesTags: ["Hero"],
//     }),
//   }),
// });

// export const {
//   useGetPublicHeroQuery,
//   useGetAdminHeroQuery,
//   useSaveHeroMutation,
//   useDeleteHeroMutation,
// } = heroApi;







// import mongoose from "mongoose";

// const heroSchema = new mongoose.Schema(
//   {
//     adminId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Admin",
//       required: true,
//       unique: true,
//     },

//     badgeText: { type: String, default: "" },
//     title: { type: String, default: "" },
//     highlightText: { type: String, default: "" },
//     description: { type: String, default: "" },

//     buttonPrimary: { type: String, default: "" },
//     buttonSecondary: { type: String, default: "" },

//     phone: { type: String, default: "" },
//     email: { type: String, default: "" },
//     location: { type: String, default: "" },

//     stats: [
//       {
//         value: String,
//         label: String,
//       },
//     ],
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Hero", heroSchema);
