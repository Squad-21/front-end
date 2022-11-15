import { useEffect, useState } from "react";
import { 
    Typography, 
    Alert,
    AlertTitle
} from '@mui/material';
import styled, { css } from "styled-components";
import Breadcrumbs from "../../../components/Breadcrumbs";
import SearchBar from "../SearchBar";
import Table from "../Table";
import { Links } from "../../../constants/links";
import { Link } from "react-router-dom";
import LoadingPage from "../../Loading";
import useAuthStore from "../../../context/authStore";
import { getAllUsersAction } from "../../../service/api";
import Row from "./Row";
import AdminContent from '../AdminContent';

const columns = [
    {
        id: 'name',
        label: 'Nome',
        textAlign: 'left',
        minWidth: 170,
        maxWidth: 170
    },
    {
        id: 'admin',
        label: 'Nível',
        textAlign: 'center',
        minWidth: 50,
        maxWidth: 100
    },

    {
        id: 'edit',
        label: 'Editar',
        textAlign: 'center',
        minWidth: 50,
        maxWidth: 50
    }
]

const AdminUsersPage = () => {
    const [allUsers, setAllUsers] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const { user, token } = useAuthStore((state) => ({user: state.user, token: state.token}));

    let searchedUsers = searchText && searchText != ''?
    allUsers.filter(user => user.name.toLowerCase().indexOf(searchText.toLowerCase()) != -1) 
    : allUsers
    const breadcrumbs = [
        <Link key={1} to={Links.path.admin.root}>
            Admin
        </Link>,
        <Link key={2} to={Links.path.admin.users.root}>
            Usuários
        </Link>
    ]

    const fetchData = async() => {

        const data = await getAllUsersAction(token);

        if(data.error) {
            setIsLoading(false);
            setErrorMessage(data.error)
            return 
        }
        setAllUsers(data.users.users);
        setErrorMessage(null);
        return data.users
    }

    useEffect(() => {
        fetchData()
        .then(res => {
            setIsLoading(false);
            console.log(res);
        })
        .catch(e => setErrorMessage('Erro ao obter dados'))
    },[])

    if(isLoading) {
        return <LoadingPage />
    }

    return ( 
        <AdminContent active='users'>
            {errorMessage && 
                <Alert severity="error" sx={{marginBottom: '1rem'}}>
                    <AlertTitle>Erro</AlertTitle>
                    {errorMessage}
                </Alert>
            } 
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            <SearchBar
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />
            <Typography 
                variant="h5" 
                component="div"
                fontWeight='bold'
                sx={{
                    paddingTop: '2rem'
                }}
            >
                Todos os usuários
            </Typography>
            <Table columns={columns}>
                {
                    searchedUsers?.map(user =>  
                        <Row 
                            user={user} 
                            key={user._id}
                            getData={fetchData}
                        />
                    )
                }
            </Table>
        </AdminContent>
     );
}
 
export default AdminUsersPage;

const Container = styled.div`
    padding: 1rem;
`