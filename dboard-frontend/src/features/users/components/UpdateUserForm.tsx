import { Box, TextField } from "@mui/material";
import styled from "styled-components";
import type { User, UpdateUserData } from "../types/user";
import { useForm } from "react-hook-form";
import { updateUserSchema, type UpdateUserFormData } from "../validation/userValidation";
import { zodResolver } from "@hookform/resolvers/zod";


const FormContainer = styled(Box)`
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
`;

const StyledTextField = styled(TextField)`
    margin-bottom: 1.5rem;
`;

interface UpdateUserProps {
    user?: User;
    onSubmit: (data: UpdateUserData) => Promise<void>;
    loading?: boolean;
    error?: Error | null;
}

export const UpdateUserForm = ({
    user,
    onSubmit,
    loading = false,
    error
}: UpdateUserProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UpdateUserFormData>({ 
        resolver: zodResolver(updateUserSchema),
        defaultValues: {
            name: user?.name || "",
            email: user?.email || "",
            password: "",
            password_confirmation: "",
        },
    });

    const onSubmit = () => {

    }

    return (
        <FormContainer>
            
        </FormContainer>
    );
}