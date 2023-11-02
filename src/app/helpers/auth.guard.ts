// goal - prevent logged out users from accessing account, vote, and new-book routes
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export function authenticationGuard(): CanActivateFn {
    return () => {
        const authService: AuthService = inject(AuthService);
        const router: Router = inject(Router);

        if (!authService.loggedIn()) {
            router.navigate(['/login']);
            return false;
        }
        return true;
        
    };
}