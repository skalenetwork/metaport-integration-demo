import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';

import BugReportIcon from '@mui/icons-material/BugReport';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


export default function KnownIssues() {
    return (

        <List className='mp__margBott40'>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <BugReportIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Skipped steps" secondary="Sometimes steps may be automatically skipped incorretly. Reload the page to fix it." />
            </ListItem>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <BugReportIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Unwrap bug" secondary="Unwrap action breaks the Metaport - reload the page to fix it." />
            </ListItem>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <LightbulbIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Error handling" secondary="In the current version error handling is not implemented, check out developer console to see errors." />
            </ListItem>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <LightbulbIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Separate wrap/unwrap actions" secondary="Separate wrap/unwrap actions are not available in this version." />
            </ListItem>
        </List>
    );
}
