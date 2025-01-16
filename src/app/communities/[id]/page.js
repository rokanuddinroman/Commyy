import CommunityClient from "./CommunityClient";

export default function CommunityPage({ params }) {
  return <CommunityClient id={params.id} />;
}
