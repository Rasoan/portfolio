import React from "react"
import {Button} from "@material-ui/core";
import storeFilterProjects from "../../../store/storeFilterProjects";
import {useHistory} from "react-router-dom";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ClearIcon from '@material-ui/icons/Clear';
import {Sort} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import {useTranslation} from "react-i18next";
import clsx from "clsx";
import storeApp from "../../../store/storeApp";

const useStyles = makeStyles(theme => ({
    darkMode: {
        color: props => props.darkMode ? theme.palette.common.white : theme.palette.primary.main
    },
    showModal: {
        minWidth: 100,
        justifyContent: "left",
        padding: "6px 2px 4px 2px",
    },
    showModalLabel: {
        marginLeft: "auto",
        marginRight: "14px",
        [theme.breakpoints.down('xs')]: {
            fontSize: 12,
        },
    },
    showModalIcon: {
        margin: theme.spacing(0, 1),
        [theme.breakpoints.down('xs')]: {
            fontSize: 12,
        },
    },
    menuItem: {
        fontSize: 16,
        [theme.breakpoints.down('xs')]: {
            fontSize: 12,
            minHeight: "unset",
        },
    },
    menuIcon: {
        margin: theme.spacing(0, 1),
    },
}))

const SortingElements = () => {
    const {t} = useTranslation()
    const classes = useStyles({darkMode: storeApp.darkMode})
    const history = useHistory()
    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl);
    const selectSorting = (sortByReleaseDate, sortByRating) => {
        const showProjectsWithTechnologiesUrl = storeFilterProjects.showProjectsWithTechnologies.length > 0 &&
        storeFilterProjects.showProjectsWithTechnologies.length !== storeFilterProjects.allProjectsWithTechnologies.length ?
            `&showProjectsWithTechnologies=${storeFilterProjects.showProjectsWithTechnologies}` : ""
        if (sortByReleaseDate) {
            history.push(`?sortByReleaseDate=${sortByReleaseDate}${showProjectsWithTechnologiesUrl}`)
            storeFilterProjects.selectSorting("sortByReleaseDate", sortByReleaseDate)
        } else if (sortByRating) {
            history.push(`?sortByRating=${sortByRating}${showProjectsWithTechnologiesUrl}`)
            storeFilterProjects.selectSorting("sortByRating", sortByRating)
        } else {
            history.push(`?${showProjectsWithTechnologiesUrl}`)
            storeFilterProjects.selectSorting(null, null)
        }
        setAnchorEl(null)
    }

    return <>
        <Button startIcon={<Sort />}
                aria-controls="fade-menu"
                aria-haspopup="true"
                variant="outlined"
                onClick={(event) => setAnchorEl(event.currentTarget)}
                classes={{
                    root: classes.showModal,
                    label: clsx(classes.showModalLabel, classes.darkMode),
                    startIcon: clsx(classes.showModalIcon, classes.darkMode),
                }}
        >
            {t('projectsPage.controlPanel.sort.buttonShowModal')}
        </Button>
        <Menu
            id="fade-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={() => setAnchorEl(null)}
            TransitionComponent={Fade}
        >
            <MenuItem className={classes.menuItem}
                      onClick={() => selectSorting("true", null)}>
                <ExpandLessIcon className={clsx(classes.menuIcon, classes.darkMode)}/>
                {t('projectsPage.controlPanel.sort.sortingCategories.date')}
            </MenuItem>
            <Divider/>
            <MenuItem className={classes.menuItem}
                      onClick={() => selectSorting("false", null)}>
                <ExpandMoreIcon className={clsx(classes.menuIcon, classes.darkMode)}/>
                {t('projectsPage.controlPanel.sort.sortingCategories.date')}
            </MenuItem>
            <Divider/>
            <MenuItem className={classes.menuItem}
                      onClick={() => selectSorting(null, "true")}>
                <ExpandLessIcon className={clsx(classes.menuIcon, classes.darkMode)}/>
                {t('projectsPage.controlPanel.sort.sortingCategories.rating')}
            </MenuItem>
            <Divider/>
            <MenuItem className={classes.menuItem}
                      onClick={() => selectSorting(null, "false")}>
                <ExpandMoreIcon className={clsx(classes.menuIcon, classes.darkMode)}/>
                {t('projectsPage.controlPanel.sort.sortingCategories.rating')}
            </MenuItem>
            <Divider/>
            <MenuItem className={classes.menuItem}
                      onClick={() => selectSorting(null, null)}>
                <ClearIcon className={clsx(classes.menuIcon, classes.darkMode)}/>
                {t('projectsPage.controlPanel.sort.sortingCategories.reset')}
            </MenuItem>
        </Menu>
    </>
}

export default SortingElements