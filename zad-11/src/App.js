import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient'; // Убедитесь, что у вас есть настроенный Apollo Client
import RegisterForm from './components/RegisterForm'; // Путь к вашему компоненту формы регистрации

function App() {
    return (
        <ApolloProvider client={client}>
            <div className="App">
                <header className="App-header">
                </header>
                <main>
                    <RegisterForm />
                </main>
            </div>
        </ApolloProvider>
    );
}

export default App;