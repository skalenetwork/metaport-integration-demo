import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

import BugReportIcon from '@mui/icons-material/BugReport';
import LightbulbIcon from '@mui/icons-material/Lightbulb';


export default function KnownIssues() {
    return (
        <List className='mp__margBott40'>
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
