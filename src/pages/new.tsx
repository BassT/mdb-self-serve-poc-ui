import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function New() {
  const [name, setName] = useState("");

  const handleClickSubmit = async () => {
    const response = await fetch(
      new URL("/clusters", process.env.NEXT_PUBLIC_API_HOST),
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name }),
      }
    );
    if (response.ok) {
      alert(`Created cluster ${name}`);
      window.location.assign("/");
    } else {
      alert(`Failed to create cluster ${name}: ${response.statusText}`);
    }
  };

  return (
    <>
      <Typography variant="h1">Create cluster</Typography>
      <p>
        <TextField
          id="name"
          label="Name"
          required
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </p>
      <Button variant="contained" onClick={handleClickSubmit}>
        Submit
      </Button>
    </>
  );
}
