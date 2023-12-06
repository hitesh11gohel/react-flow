import { Checkbox, FormControlLabel, FormGroup, Stack } from "@mui/material";
import React, { memo, useCallback } from "react";

export default memo(({ data, isConnectable }) => {
  const onChange = useCallback((e) => (data.value = e.target.checked), [data]);
  return (
    <Stack>
      <FormGroup>
        <FormControlLabel
          label={
            data?.label.length > 25
              ? data?.label.substring(0, 23) + "..."
              : data?.label
          }
          control={
            <Checkbox
              defaultChecked={data?.value}
              onChange={onChange}
              color={"default"}
            />
          }
        />
      </FormGroup>
    </Stack>
  );
});
