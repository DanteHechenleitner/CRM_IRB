import { Card, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Cliente } from "./clientesForm";
import { useRouter } from "next/router";

interface ClienteFromDB extends Cliente{
    _id: string
}


interface Props{
    clientes : ClienteFromDB[]
}


const ClientesList = ({clientes}: Props) =>{
    const router = useRouter()
    return(
        <Flex flexDirection="column" gap={2} mt={2}>
            {clientes.map((c) => ( 
                <Card key={c._id} py={2} px={4} cursor="pointer" 
                _hover={{bg:"grey", color:"white", transition:"0.2s"}}
                onClick={()=> router.push(`/clientes/${c._id}`)}
                >
                    <Text> {c.firstname} </Text>
                </Card>
            ))}
        </Flex>
    )
}


export default ClientesList