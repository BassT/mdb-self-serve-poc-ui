import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

interface Cluster {
  id: string;
  name: string;
  status: {
    phase: string;
    message: string;
  };
}

export default function Home() {
  const [clusters, setClusters] = useState<Array<Cluster>>([]);

  useEffect(() => {
    const fetchClusters = async () => {
      const response = await fetch(
        new URL("/clusters", "http://localhost:8080")
      );
      const data = await response.json();
      if (Array.isArray(data)) {
        setClusters(data);
      }
    };

    fetchClusters();
  }, []);

  return (
    <>
      <Typography variant="h1">Clusters</Typography>
      <Button
        variant="contained"
        onClick={() => window.location.assign("/new")}
      >
        Create cluster
      </Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clusters.map((cluster) => (
              <TableRow key={cluster.id}>
                <TableCell>{cluster.name}</TableCell>
                <TableCell>{cluster.status.phase}</TableCell>
                <TableCell>{cluster.status.message}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
