import { OnlinePrediction, People, PersonAdd } from "@mui/icons-material";
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { HEADER_HEIGHT } from "./Header";
import type { ReactElement } from "react";
import styled from "styled-components";
import { API_ENDPOINTS } from "../../constants/navigation";
import { useLocation, useNavigate } from "react-router-dom";

export const SIDEBAR_WIDTH = '13rem';

const StyledDrawer = styled(Drawer)`
    flex-shrink: 0;
    && {
        .MuiDrawer-paper {
            width: ${SIDEBAR_WIDTH};
            box-sizing: border-box;
            border-right: 1px solid #e5e7eb;
            background: #fafafa; 
            top: ${HEADER_HEIGHT}px;
        }
    }
`;

const StyledListItemButton = styled(ListItemButton)<{ $active?: boolean }>`
    && {
        margin: 4px 8px;
        border-radius: 8px;
        background: ${props => props.$active ? 
            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent'
        };
        color: ${props => props.$active ? 'white' : 'inherit'};

        &:hover {
            background: ${props => props.$active ?
                'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)' :
                'rgba(102, 126, 234, 0.1)'
            };
        }
        
        .MuiListItemIcon-root {
            color: ${props => props.$active ? 'white' : '#667eea'};}
    }
`;

interface SidebarItem {
    text: string;
    icon: ReactElement;
    path: string;
}

const sidebarItems: SidebarItem[] = [
    {
        text: 'ユーザー一覧',
        icon: <People />,
        path: API_ENDPOINTS.USERS.LIST,
    },
    {
        text: 'ユーザー作成',
        icon: <PersonAdd />,
        path: API_ENDPOINTS.USERS.CREATE,
    },
    {
        text: 'オンラインユーザー一覧',
        icon: <OnlinePrediction />,
        path: API_ENDPOINTS.USERS.ONLINE,
    }
];

interface SidebarProps {
    open: boolean;
    onClose: () => void;
    variant?: 'permanent' | 'persistent' | 'temporary';
}

export const Sidebar = ({
    open,
    onClose,
    variant = 'permanent',
}: SidebarProps) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleItemClick = (path: string) => {
        navigate(path);
        if(variant === 'temporary') {
            onClose();
        }
    }

    return (
        <StyledDrawer
            variant={variant}
            open={open}
            onClose={onClose}
        >
            <Box sx={{ mt: 2 }}>
                <List>
                    {sidebarItems.map((item) => (
                        <ListItem key={item.path} disablePadding>
                            <StyledListItemButton
                                onClick={() => handleItemClick(item.path)}
                                {...{ $active: location.pathname === item.path }}
                            >
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.text} />
                            </StyledListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </StyledDrawer>
    );
}