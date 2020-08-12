import { IGrant } from './interfaces';
import * as moment from 'moment';
import { Utils } from '../utils';

export class GrantViewModel {
    public id: number;
    public grantManager: string;
    public grantee: string;
    public revokedAt: number;
    public revokedAmount: number;
    public revokedWithdrawn: number;
    public revocable: boolean;
    public amount: number;
    public duration: number;
    public start: number;
    public cliff: string;
    public withdrawn: number;
    public availableToStake: number;
    public staked: number;
    public stakingPolicy: string;
    public timestamp: number;
    public readyToReleaseExclusiveStaked: string;
    public readyToRelease: string;

    constructor(grant: IGrant) {
        this.id = grant.id;
        this.grantManager = grant.grantManager;
        this.grantee = grant.grantee;
        this.revokedAt = Number(grant.revokedAt);
        this.revokedAmount = grant.revokedAmount;
        this.revokedWithdrawn = grant.revokedWithdrawn;
        this.revocable = grant.revocable;
        this.amount = grant.amount;
        this.duration = grant.duration;
        this.start = Number(grant.start);
        this.cliff = grant.cliff;
        this.withdrawn = grant.withdrawn;
        this.availableToStake = 0;
        this.staked = grant.staked;
        this.stakingPolicy = grant.stakingPolicy;
        this.timestamp = grant.timestamp;
        this.readyToReleaseExclusiveStaked = Utils.toFixed(this.calcultateUnlockedAmount()).toString();
        this.readyToRelease = Utils.toFixed(Number(this.readyToReleaseExclusiveStaked) - this.staked).toString();
    }

    private calcultateUnlockedAmount(): number {
        // tslint:disable-next-line: triple-equals
        if (this.revokedAt > 0) {
            return this.amount - this.revokedAmount;
        }

        const cliffNotReached = Date.now() / 1000 < Number(this.cliff);
        if (cliffNotReached) {
            return 0;
        }
        const diff = moment(Date.now()).diff(moment(this.start * 1000));
        const timeElapsed = Math.round(diff / 1000);

        const unlockingPeriodFinished = timeElapsed >= this.duration;
        if (unlockingPeriodFinished) {
            return this.amount;
        }

        return this.amount * (timeElapsed / this.duration) - this.withdrawn;
    }
}
