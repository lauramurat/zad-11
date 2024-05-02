import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../mutations/userMutations';
import './RegisterForm.css';
import april from '../april.jpg';
import { Button, Form, Container, Row, Col, Image } from 'react-bootstrap'; // Импорт Bootstrap компонентов
import 'bootstrap/dist/css/bootstrap.min.css'; // Импорт стилей Bootstrap

const schema = yup.object({
    name: yup.string().required("Требуется имя"),
    email: yup.string().email("Должен быть действительный адрес электронной почты").required("Требуется электронная почта"),
    password: yup.string().min(6, "Пароль должен содержать не менее 6 знаков").required("Необходим пароль"),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], "Пароли должны совпадать")
}).required();

const RegisterForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const [registerUser, { data, loading, error }] = useMutation(REGISTER_USER);

    const onSubmit = async (formData) => {
        const { name, email, password } = formData;
        try {
            await registerUser({ variables: { name, email, password } });
            console.log('Регистрация прошла успешно', data);
        } catch (e) {
            console.error('Регистрация не удалась', e);
        }
    };

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>Произошла ошибка</p>;

    return (
        <Container className="mt-5">
            <h1>Форма регистрации</h1>
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Имя</Form.Label>
                            <Form.Control type="text" placeholder="Введите имя" {...register('name')}
                                          isInvalid={!!errors.name}/>
                            <Form.Control.Feedback type="invalid">
                                {errors.name?.message}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Адрес электронной почты</Form.Label>
                            <Form.Control type="email" placeholder="Введите адрес электронной почты" {...register('email')}
                                          isInvalid={!!errors.email}/>
                            <Form.Control.Feedback type="invalid">
                                {errors.email?.message}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control type="password" placeholder="Пароль" {...register('password')}
                                          isInvalid={!!errors.password}/>
                            <Form.Control.Feedback type="invalid">
                                {errors.password?.message}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                            <Form.Label>Подтвердите пароль</Form.Label>
                            <Form.Control type="password"
                                          placeholder="Подтвердите пароль" {...register('confirmPassword')}
                                          isInvalid={!!errors.confirmPassword}/>
                            <Form.Control.Feedback type="invalid">
                                {errors.confirmPassword?.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button  variant="outline-warning" type="submit">
                            Регистрация
                        </Button>
                    </Form>
                </Col>
                <Col xs={12} md={6} className="image-col">
                    <img src={april} alt="Image" className="image" />
                </Col>
            </Row>
        </Container>
    );
};

export default RegisterForm;
