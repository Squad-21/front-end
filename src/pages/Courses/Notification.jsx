import { useState } from 'react';
import {
    Alert,
    Collapse,
    IconButton,
    Typography,
    Avatar
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useIsDesktop } from '../../hooks/useIsDesktop';
import styled, { css } from 'styled-components';
import useAuthStore from '../../context/authStore';
import useSettingsStore from '../../context/settingsStore';
import { Style } from '../../constants/style';

const Notification = () => {
    const isDesktopOrLaptop = useIsDesktop();
    const {user} = useAuthStore((state) => ({user: state.user}));
    const { 
      notificationIsVisible,
      toggleNotificationVisibility
    } = useSettingsStore((state) => ({
      notificationIsVisible: state.notificationIsVisible,
      toggleNotificationVisibility: state.toggleNotificationVisibility
    }));

    if(!user) {
      return
    }

    return ( 
        <Collapse in={notificationIsVisible} sx={{
            position: 'absolute',
            top: isDesktopOrLaptop? 65 : 52,
            left: isDesktopOrLaptop? 'auto' : 2,
            right: isDesktopOrLaptop? 50 : 'auto',
            width: '100%',
            zIndex: 99,
            minWidth: 355,
            maxWidth: 404,
        }}>
        <Alert
            severity="warning"
            icon={false}
            sx={{
                mb: 2,
                backgroundColor: Style.colors['light-orange']
            }}
            elevation={3}
            action={
                <IconButton
                aria-label="close"
                color="inherit"
                size="large"
                onClick={() => toggleNotificationVisibility(false)}
                >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          <TitleContainer>
            <Avatar
              alt={user.name}
              src={user.avatar.url}
              sx={{ width: 54.63, height: 54.63 }}
            />
            <Greetings>
              <Typography 
                variant="subtitle1" 
                component="div"
                color='black'
              >
                  Olá,
              </Typography>
              <Typography 
                gutterBottom
                variant="h5" 
                component="div"
                color='black'
                fontWeight='bold'
              >
                  {user.name.split(' ')[0]},
              </Typography>
            </Greetings>
          </TitleContainer>
            <Typography 
              gutterBottom
              variant="body2" 
              component="div"
              color='#65686D'
            >
              Abaixo você pode escolher qual trilha pretende aprender, assistir aulas, ler artigos e uma infinidades de conteúdos para você.
            </Typography>
        </Alert>
      </Collapse>
    );
}
 
export default Notification;

const TitleContainer = styled.div`
  display: flex;
  column-gap: 1rem;
`
const Greetings = styled.div`
  display: flex;
  flex-direction: column;
`