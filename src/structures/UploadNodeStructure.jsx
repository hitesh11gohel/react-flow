import { Avatar, Box, Stack, TextField } from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import { imageReader } from "../components/ImageReader";

export default memo(({ data }) => {
  const [image, setImage] = useState();
  useEffect(() => {
    data?.flag && setImage(data.value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Stack>
      <Box className="d-flex justify-content-center">
        <Stack>
          <TextField
            type="file"
            sx={{ width: 550, mt: 2, bgcolor: "aliceblue" }}
            onChange={(e) => imageReader(data, e.target.files[0], setImage)}
          />
          {data?.flag && image && (
            <Box className="d-flex justify-content-center">
              {data.value && (
                <Avatar
                  src={image}
                  alt={data.label}
                  variant="square"
                  sx={{ width: "150px", height: "150px", mt: "1.8rem" }}
                />
              )}
            </Box>
          )}
        </Stack>
      </Box>
    </Stack>
  );
});
