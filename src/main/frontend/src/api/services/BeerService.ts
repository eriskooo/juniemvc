/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BeerDto } from '../models/BeerDto';
import type { BeerPatchDto } from '../models/BeerPatchDto';
import type { PageOfBeerDto } from '../models/PageOfBeerDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BeerService {
    /**
     * Get all beers
     * Returns a paginated list of beers in the system with optional filtering by beer name and beer style.
     * @param beerName Filter beers by name (optional)
     * @param beerStyle Filter beers by style (optional)
     * @param page Page number (0-based, defaults to 0)
     * @param size Page size (defaults to 20)
     * @returns PageOfBeerDto Successfully retrieved the list of beers
     * @throws ApiError
     */
    public static getAllBeers(
        beerName?: string,
        beerStyle?: string,
        page?: number,
        size: number = 20,
    ): CancelablePromise<PageOfBeerDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/beers',
            query: {
                'beerName': beerName,
                'beerStyle': beerStyle,
                'page': page,
                'size': size,
            },
            errors: {
                400: `Bad request`,
                401: `Unauthorized`,
            },
        });
    }
    /**
     * Create a new beer
     * Creates a new beer in the system. The ID, version, createdDate, and updateDate fields will be ignored if provided.
     * @param requestBody Beer object to be created
     * @returns BeerDto Successfully created a new beer
     * @throws ApiError
     */
    public static createBeer(
        requestBody: BeerDto,
    ): CancelablePromise<BeerDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/beers',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request - validation error`,
                401: `Unauthorized`,
            },
        });
    }
    /**
     * Get a beer by ID
     * Returns a single beer identified by its ID.
     * @param id ID of the beer to operate on
     * @returns BeerDto Successfully retrieved the beer
     * @throws ApiError
     */
    public static getBeerById(
        id: number,
    ): CancelablePromise<BeerDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/beers/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad request`,
                401: `Unauthorized`,
                404: `Beer not found`,
            },
        });
    }
    /**
     * Update a beer
     * Updates an existing beer identified by its ID. The ID in the path must match the ID in the request body.
     * @param id ID of the beer to operate on
     * @param requestBody Updated beer object
     * @returns BeerDto Successfully updated the beer
     * @throws ApiError
     */
    public static updateBeer(
        id: number,
        requestBody: BeerDto,
    ): CancelablePromise<BeerDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/beers/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request - validation error`,
                401: `Unauthorized`,
                404: `Beer not found`,
            },
        });
    }
    /**
     * Partially update a beer
     * Partially updates an existing beer identified by its ID. Only the provided fields will be updated.
     * @param id ID of the beer to operate on
     * @param requestBody Partial beer object with only the fields to update
     * @returns BeerDto Successfully updated the beer
     * @throws ApiError
     */
    public static patchBeer(
        id: number,
        requestBody: BeerPatchDto,
    ): CancelablePromise<BeerDto> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/beers/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request`,
                401: `Unauthorized`,
                404: `Beer not found`,
            },
        });
    }
    /**
     * Delete a beer
     * Deletes a beer identified by its ID.
     * @param id ID of the beer to operate on
     * @returns void
     * @throws ApiError
     */
    public static deleteBeer(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/beers/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad request`,
                401: `Unauthorized`,
                404: `Beer not found`,
            },
        });
    }
}
