import { call, put, takeEvery} from 'redux-saga/effects'
import { mySaga, fetchData } from './index'
import { get } from '../../services/api';
import { dataFetchSucceeded , dataFetchFailed, DATA_FETCH_REQUESTED} from '../actions'
import data from '../../todolistData.json'

describe('Saga', () => {

    describe('mySaga', () => {
        it('should call fetchData when receiving action with DATA_FETCH_REQUESTED', () => {
            const iterator: any = mySaga()
            expect(iterator.next().value).toEqual(takeEvery(DATA_FETCH_REQUESTED,fetchData))
        })
    })

    describe('fetchData', () => {
        describe('with successfull api call', () => {
            const items = data.items

            it('should go through the saga', () => {
                const iterator = fetchData()
                expect(iterator.next().value).toEqual(call(get,'http://localhost:3000/items'))
                expect(iterator.next(items).value).toEqual(put(dataFetchSucceeded(items)))
            })
        })

        describe('with failed api call', () => {
            const items = data.items
            const err = {message: 'SomeError'}

            it('should go through the saga', () => {
                const iterator:any = fetchData()
                expect(iterator.next().value).toEqual(call(get,'http://localhost:3000/items'))
                expect(iterator.throw(err).value).toEqual(put(dataFetchFailed('SomeError')))
            })
        })
    })
})