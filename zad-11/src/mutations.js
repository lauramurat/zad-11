import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
    mutation RegisterUser($email: String!, $password: String!) {
        registerUser(email: $email, password: $password) {
            id
            email
        }
    }
`;
