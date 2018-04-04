import * as types from '../actions/actionTypes';

function createTeam(state, action) {
    return {
        answer: 0,
        answeredAt: 0,
        score: 0,
        createdAt: action.createdAt,
        isSubmitted: false
    }
}

function fetchTeams (state, action) {
    return action.teams
} 

function submitAnswer(state, action) {
    return action.id ? {
        ...state,
        answer: action.answer,
        answeredAt: action.answeredAt,
        isSubmitted: true
    } : state
}

function updateTeam(state, action) {
    return {
        ...state,
        answer: 0,
        answeredAt: 0,
        score: action.newScore,
        isSubmitted: false
    }
}

function toggleShowAnswers(state, action) {
    return !action.isShowingAnswers
}

function fetchIsShowingAnswers(state, action) {
    return action.isShowingAnswers
}

export function isShowingAnswers(state = false, action) {

    const actionsHandler = {
        [types.TOGGLE_SHOW_ANSWERS]: toggleShowAnswers,
        [types.FETCH_IS_SHOWING_ANSWERS]: fetchIsShowingAnswers
    };

    const reducer = actionsHandler[action.type];

    return reducer ? reducer(state, action) : state
}

export default function(state = {}, action) {

    const actionsHandler = {
        [types.CREATE_TEAM]: createTeam,
        [types.SUBMIT_ANSWER]: submitAnswer,
        [types.FETCH_TEAMS]: fetchTeams,
        [types.UPDATE_TEAM]: updateTeam
    };

    const reducer = actionsHandler[action.type];

    
    return reducer ? (
        action.id ? { 
            ...state, 
            [action.id]: reducer(state[action.id], action) 
        } : reducer(state, action)
    ) : state  
} 