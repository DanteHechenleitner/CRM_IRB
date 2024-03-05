import { NextPage } from "next";
import {Container, Heading, FormControl,FormLabel,Input,FormHelperText, Card, 
CardHeader, CardBody, CardFooter, Button, FormErrorMessage, ButtonGroup
} from "@chakra-ui/react"
import {useForm} from "react-hook-form"
import axios from "axios"
import { useEffect } from "react";
import { env } from "~/env.mjs";
import { useRouter } from "next/router";
import { Schema, z } from "zod";
import {zodResolver} from "@hookform/resolvers/zod"

const schema = z.object({
    email: z.string().email("Email invalido"),
    code: z.string().length(6, "Codigo invalido")
})

type FieldValues = z.infer<typeof schema>


const Login: NextPage = () =>{
    const {register, getValues, formState: {errors}, handleSubmit} = useForm<FieldValues>({
        resolver: zodResolver(schema)
    })
    const {name, onBlur, onChange, ref} = register("email")


    const router = useRouter()

    const onSubmit = () => {
        const {email, code} = getValues()
        console.log({email,code})
        axios.post(`${env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/login/${email}`, {code}, {withCredentials: true})
        .then(({data})=>{
            router.push("/")
        })
        .catch(console.log)
    }

    const onError = () =>{
        console.log({errors})
    }    
    return (
        <Container marginTop={10}>
            <Heading textAlign="center">Iniciar Sesion</Heading>
            <Card padding={3}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl marginBottom={5} isInvalid={!!errors.email}>
                        <FormLabel>Email</FormLabel>
                        <Input 
                        type='text' 
                        placeholder="Ingresa tu email"
                        {...register("email")}
                        />
                        <FormErrorMessage> {errors.email?.message} </FormErrorMessage>
                    </FormControl>
                    <FormControl marginBottom={5} isInvalid={!!errors.code}>
                        <FormLabel>Codigo</FormLabel>
                        <Input type='text' placeholder="Ingresa tu codigo" {...register("code")} />
                        <FormErrorMessage> {errors.code?.message} </FormErrorMessage>
                    </FormControl>
                    <ButtonGroup>
                        <Button colorScheme="blue" type="submit" onClick={()=>{
                 
                        }}>Iniciar Sesión</Button> 
                        <Button colorScheme="blue"  onClick={()=>{
                            const email = getValues("email")
                            axios.post(`${env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/login/${email}/code`)
                            .then(console.log)
                            .catch(console.log)
                        }}>Codigo</Button>

                        <Button colorScheme="gray" type="submit" onClick={()=>{
                            router.push("/")
                         }}>VOLVER</Button>  
                    </ButtonGroup>
                </form>
                
            </Card>

        </Container>
        
    )
}

export default Login