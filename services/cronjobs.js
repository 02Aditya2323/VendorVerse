const cron = require('node-cron');
const Group = require('../models/Groups');



class CronJobService {
    
    // Update expired groups to 'closed' status 
    static async updateExpiredGroups() { // cron job which is async which updates expred groips
        try {
            const result = await Group.updateMany(
                { 
                    expiryDate: { $lt: new Date() }, 
                    status: "open" 
                },
                { status: "closed" }
            );
            
            if (result.modifiedCount > 0) {
                console.log(`✅ Updated ${result.modifiedCount} expired groups to 'closed' status`);
            } else {
                console.log('📅 No expired groups found to update');
            }
            
            return result;
        } catch (error) {
            console.error('❌ Error updating expired groups:', error);
        }
    }

    // Initialize all cron jobs
    static initializeCronJobs() {
        console.log('🚀 Initializing cron jobs...');
        
        // Run every hour at minute 0 (e.g., 1:00, 2:00, 3:00...)
        cron.schedule('0 * * * *', () => {
            console.log('⏰ Running hourly group expiry check...');
            this.updateExpiredGroups();
        });

        // Optional: Run every day at midnight for cleanup
        cron.schedule('0 0 * * *', () => {
            console.log('🌙 Running daily group expiry check...');
            this.updateExpiredGroups();
        });

        console.log('✅ Cron jobs initialized successfully');
    }

    // Manual trigger (useful for testing)
    static async manualExpiredGroupsUpdate() {
        console.log('🔧 Manual trigger: Updating expired groups...');
        return await this.updateExpiredGroups();
    }
}
// will write own cronjob for deleting products after they are sold or expired
module.exports = CronJobService;