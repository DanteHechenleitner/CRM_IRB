import { Button, ButtonGroup, Card, Container, Heading, Spinner } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ClientesList from "../../../components/entities/clientes/clientesList"
import { NextPage } from "next";
import { useRouter } from "next/router";
import { env } from "~/env.mjs";


const ClientesPage: NextPage = () =>{
    const router = useRouter()

    const {data: cliente, isLoading} = useQuery({queryKey:["clientes"], queryFn: async ()=>{
        const res = await axios.get(
            `${env.NEXT_PUBLIC_BACKEND_BASE_URL}/clientes`,
            {withCredentials: true},
        )
        return res.data.data
    }})

    return <Container mt={8}>
        <Card padding={4}>
            <Heading>Clientes</Heading>
            {isLoading ? <Spinner/> : <ClientesList clientes={cliente} />}
            <ButtonGroup mt={4}>
                <Button colorScheme="blue" onClick={()=>{
                router.push("/clientes/new")
                }}>NUEVO CLIENTE</Button>

                <Button colorScheme="gray" onClick={()=>{
                router.push("/")
                }}>VOLVER</Button>
            </ButtonGroup>
        </Card>

    </Container>
} 

export default ClientesPage