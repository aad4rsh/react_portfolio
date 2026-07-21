const designs = [
  // ── Elections ──
  {
    id: 1,
    title: "Satya Netritwa",
    folder: "elections",
    image: "/designs/elections/satyaNetritwa.png",
    featured: true,
  },
  {
    id: 2,
    title: "Samay Paribatan",
    folder: "elections",
    image: "/designs/elections/samayParibatan.png",
    featured: true,
  },
  {
    id: 3,
    title: "Dhankuta Ko Bhalo",
    folder: "elections",
    image: "/designs/elections/dhankutaKoBhalo.png",
    featured: true,
  },
  {
    id: 4,
    title: "Ghar Gharma",
    folder: "elections",
    image: "/designs/elections/gharGharma.png",
  },
  {
    id: 5,
    title: "Sewa Mai",
    folder: "elections",
    image: "/designs/elections/sewaMai.png",
  },
  {
    id: 6,
    title: "Vote Halo Ma All",
    folder: "elections",
    image: "/designs/elections/voteHaloMaAll.png",
  },

  // ── Event ──
  {
    id: 7,
    title: "Panel",
    folder: "Event",
    image: "/designs/Event/panel_v2.png",
    featured: true,
  },
  {
    id: 8,
    title: "For Display",
    folder: "Event",
    image: "/designs/Event/forDisplay-20.jpg",
  },

  // ── Extra ──
  {
    id: 9,
    title: "Aadarsh Stamp",
    folder: "extra",
    image: "/designs/extra/aadarshStamp.png",
    featured: true,
  },
  {
    id: 10,
    title: "Macha",
    folder: "extra",
    image: "/designs/extra/macha_v2.png",
    featured: true,
  },
  {
    id: 11,
    title: "Balen",
    folder: "extra",
    image: "/designs/extra/balen_v3.png",
  },
  {
    id: 12,
    title: "Cover",
    folder: "extra",
    image: "/designs/extra/cover_v2.png",
  },
  {
    id: 13,
    title: "Mots 1",
    folder: "extra",
    image: "/designs/extra/mots-1.png",
  },
  {
    id: 14,
    title: "Mots 2",
    folder: "extra",
    image: "/designs/extra/mots-2.png",
  },
  {
    id: 15,
    title: "Mots 3",
    folder: "extra",
    image: "/designs/extra/mots-3.png",
  },

  // ── Festives ──
  {
    id: 16,
    title: "Kirs",
    folder: "festives",
    image: "/designs/festives/kirs.png",
  },
  {
    id: 17,
    title: "JAGS DC",
    folder: "festives",
    image: "/designs/festives/jAGS_v2_dc.png",
  },
  {
    id: 18,
    title: "JAGS",
    folder: "festives",
    image: "/designs/festives/jags.png",
  },
  {
    id: 19,
    title: "IKIS",
    folder: "festives",
    image: "/designs/festives/ikis.png",
  },
  {
    id: 20,
    title: "HIMS DC",
    folder: "festives",
    image: "/designs/festives/HIMS_dc.png",
  },
  {
    id: 21,
    title: "HIMS",
    folder: "festives",
    image: "/designs/festives/hims.png",
  },
  {
    id: 22,
    title: "Gan Jags",
    folder: "festives",
    image: "/designs/festives/gan_jags.png",
  },
  {
    id: 23,
    title: "Gan IKIS",
    folder: "festives",
    image: "/designs/festives/gan_ikis.png",
  },

  // ── Himal Signage ──
  {
    id: 24,
    title: "Master Move",
    folder: "himalSignage",
    image: "/designs/himalSignage/masterMove.png",
    featured: true,
  },
  {
    id: 25,
    title: "Bacha Hai Tu",
    folder: "himalSignage",
    image: "/designs/himalSignage/bachaHaiTu.png",
    featured: true,
  },
  {
    id: 26,
    title: "Railings",
    folder: "himalSignage",
    image: "/designs/himalSignage/railingsM.png",
    featured: true,
  },
  {
    id: 27,
    title: "Naam Shaili Ma",
    folder: "himalSignage",
    image: "/designs/himalSignage/naamShailiMa.png",
  },
  {
    id: 28,
    title: "Monsoon",
    folder: "himalSignage",
    image: "/designs/himalSignage/monsoon.png",
  },
  {
    id: 29,
    title: "Khiya Lageka",
    folder: "himalSignage",
    image: "/designs/himalSignage/khiyaLageka.png",
  },
  {
    id: 30,
    title: "Interior Signage",
    folder: "himalSignage",
    image: "/designs/himalSignage/interiorSignage.png",
  },
  {
    id: 31,
    title: "Glasses",
    folder: "himalSignage",
    image: "/designs/himalSignage/glasses_v2.png",
  },
  {
    id: 32,
    title: "Fayda Haru",
    folder: "himalSignage",
    image: "/designs/himalSignage/faydaHaru.png",
  },

  // ── Jagdish Kharel ──
  {
    id: 33,
    title: "Genz Andolan",
    folder: "JagdishKharel",
    image: "/designs/JagdishKharel/genz-Andolan.png",
    featured: true,
  },
  {
    id: 34,
    title: "Lalitpur Sweep",
    folder: "JagdishKharel",
    image: "/designs/JagdishKharel/laliitpur_Sweep.png",
    featured: true,
  },
  {
    id: 35,
    title: "Falgun 7",
    folder: "JagdishKharel",
    image: "/designs/JagdishKharel/falgun7_v9.png",
    featured: true,
  },
  {
    id: 36,
    title: "Color Page",
    folder: "JagdishKharel",
    image: "/designs/JagdishKharel/colorPage4'.png",
    featured: true,
  },
  {
    id: 37,
    title: "Sarbadhik",
    folder: "JagdishKharel",
    image: "/designs/JagdishKharel/sarbadhik2.png",
  },
  {
    id: 38,
    title: "Ummedwar",
    folder: "JagdishKharel",
    image: "/designs/JagdishKharel/ummedwar_v2.png",
  },
  {
    id: 39,
    title: "Ummedwari",
    folder: "JagdishKharel",
    image: "/designs/JagdishKharel/ummedwari.png",
  },
];

export const categories = [
  { key: "elections", label: "Elections" },
  { key: "Event", label: "Event" },
  { key: "extra", label: "Extra" },
  { key: "festives", label: "Festives" },
  { key: "himalSignage", label: "Himal Signage" },
  { key: "JagdishKharel", label: "Jagdish Kharel" },
];

const catMap = Object.fromEntries(categories.map((c) => [c.key, c.label]));
designs.forEach((d) => {
  d.category = catMap[d.folder] || d.folder;
});

export default designs;
