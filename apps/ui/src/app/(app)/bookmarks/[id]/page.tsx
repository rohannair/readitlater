export default function BookmarkDetails({
  params: { id },
}: {
  params: { id: string }
}) {
  return (
    <div>
      <h1>BookmarkDetails {id}</h1>
    </div>
  )
}
