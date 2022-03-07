import { Controller, Get, HttpCode, HttpStatus, Post, Put } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {

    constructor(
        private userService : UserService,
        private profileService: ProfileService
    ){}

    @Post('change-password')
    @HttpCode(HttpStatus.ACCEPTED)
    changePassword()
    {
        return 'changePassword'
    }

    @Post('reset-password')
    @HttpCode(HttpStatus.ACCEPTED)
    resetPassword()
    {
        return 'resetPassword'
    }

    @Post('change-password-token')
    @HttpCode(HttpStatus.ACCEPTED)
    changePasswordWithToken()
    {
        return 'changePasswordWithToken'
    }

    @Get()
    searchUser()
    {
        return 'searchUser'
    }

    @Get('profile-info')
    getProfileInfo()
    {
        return 'getProfileInfo'
    }

    @Get('follow-check')
    checkIfUserFollowsUser()
    {
        return 'checkIfUserFollowsUser'
    }

    @Put()
    @HttpCode(HttpStatus.ACCEPTED)
    updateUser()
    {
        return 'updateUser'
    }
    
    @Post('follow')
    @HttpCode(HttpStatus.ACCEPTED)
    followUser()
    {
        return 'follow'
    }

    @Post('unfollow')
    @HttpCode(HttpStatus.ACCEPTED)
    unfollowUser()
    {
        return 'unfollow'
    }
}
