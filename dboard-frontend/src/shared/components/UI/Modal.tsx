import { Dialog, DialogTitle, Typography } from "@mui/material";
import styled from 'styled-components';

const StyledDialog = styled(Dialog)`
    && .MuiDialog-paper {
        border-radius: 12px;
        min-width: 400px;
        max-width: 90vw;
    }
`;

const StyledDialogTitle = styled(DialogTitle)`
    && {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 24px 16px;
        border-bottom: 1px solid #e0e0e0;
    }
`;

const TitleText = styled(Typography)`
    && {
        font-weight: 600;
        color: #333;
    }
`;