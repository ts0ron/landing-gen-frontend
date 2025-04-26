import { useParams } from "react-router-dom";
import { Box, Typography, Paper, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import LandingPageTemplate from "../templates/landingPageTemplate/LandingPageTemplate";
import { Asset, AssetService } from "../services/api/AssetService";

const assetService = new AssetService();

const LandingPage = () => {
  const { assetId } = useParams<{ assetId: string }>();
  const [asset, setAsset] = useState<Asset | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAsset = async () => {
      if (!assetId) {
        setError("No asset ID provided");
        setLoading(false);
        return;
      }

      try {
        const assetData = await assetService.getAsset(assetId);
        console.log("assetData", assetData);
        setAsset(assetData);
      } catch (err) {
        setError("Failed to fetch asset data");
        console.error("Error fetching asset:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAsset();
  }, [assetId]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !asset) {
    return (
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Typography variant="h5" color="error">
          {error || "No asset data available"}
        </Typography>
      </Box>
    );
  }

  return (
    <Paper sx={{ p: 2 }}>
      <LandingPageTemplate asset={asset} />
    </Paper>
  );
};

export default LandingPage;
