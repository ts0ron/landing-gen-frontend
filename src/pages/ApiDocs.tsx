import { default as SwaggerUI } from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import { useState, useEffect } from "react";

const ApiDocs = () => {
  const [hasError, setHasError] = useState(false);
  const [spec, setSpec] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    const fetchSpec = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_API_URL}/api/docs/swagger.json`
        );
        const data = await response.json();
        console.log("Fetched spec:", data);
        setSpec(data);
      } catch (error) {
        console.error("Error fetching spec:", error);
        setHasError(true);
      }
    };

    fetchSpec();
  }, []);

  if (hasError) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          API Documentation Unavailable
        </h2>
        <p className="text-gray-600">
          Failures happen from time to time, please bare with us
        </p>
      </div>
    );
  }

  if (!spec) {
    return (
      <div className="container mx-auto p-8 text-center">
        <p className="text-gray-600">Loading API documentation...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <SwaggerUI
        spec={spec}
        docExpansion="list"
        defaultModelsExpandDepth={-1}
      />
    </div>
  );
};

export default ApiDocs;
