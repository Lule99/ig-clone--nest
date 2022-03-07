import { Controller, Get, HttpCode, Post, Put } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {

    constructor(
        private userService : UserService,
        private profileService: ProfileService
    ){}

    @Post('change-password')
    @HttpCode(204)
    changePassword()
    {
        return 'changePassword'
    }

    @Post('reset-password')
    @HttpCode(204)
    resetPassword()
    {
        return 'resetPassword'
    }

    @Post('change-password-token')
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
    updateUser()
    {
        return 'updateUser'
    }
    
    @Post('follow')
    @HttpCode(204)
    followUser()
    {
        return 'follow'
    }

    @Post('unfollow')
    @HttpCode(204)
    unfollowUser()
    {
        return 'unfollow'
    }
}
