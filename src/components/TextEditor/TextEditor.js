import React, { useRef } from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const StyledEditor = styled(Box)(({ theme }) => ({
    "& .ql-container": {
        minHeight: "200px",
        fontSize: "16px",
        border: (error) =>
            error
                ? `1px solid ${theme.palette.error.main}`
                : `1px solid ${theme.palette.divider}`,
        borderRadius: "0 0 4px 4px",
    },
    "& .ql-toolbar": {
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: "4px 4px 0 0",
    },
}));

const TextEditor = ({
    title = "Title",
    description = "Description",
    value,
    onChange,
    error = false,
    helperText = "",
}) => {
    const quillRef = useRef();

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline"],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ["image"],
        ],
    };

    return (
        <Box sx={{ width: "100%" }}>
            <Typography
                sx={{ color: error ? "#d32f2f" : "#1e88e5" }}
                variant="p"
                gutterBottom
            >
                {title}
            </Typography>
            <StyledEditor>
                <ReactQuill
                    ref={quillRef}
                    value={value}
                    onChange={onChange}
                    modules={modules}
                    placeholder={description}
                />
            </StyledEditor>
            {error && helperText && (
                <Typography variant="caption" color="error" sx={{ mt: 1 }}>
                    {helperText}
                </Typography>
            )}
        </Box>
    );
};

export default TextEditor;
