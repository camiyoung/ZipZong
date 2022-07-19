export default function Icon({ image }) {
  return (
    <div
      style={{
        width: "50px",
        height: "50px",
        borderRadius: "70%",
        overflow: "hidden",
      }}
    >
      <img
        src={image}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        alt=""
      />
    </div>
  )
}
