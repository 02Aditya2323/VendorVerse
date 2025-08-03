const cron = require('node-cron');
const Group = require('../models/Groups');
const Product = require('../models/Product');


class CronJobService {
    
    // Update expired groups to 'closed' status 
    static async deleteExpiredGroups() { // cron job which is async which updates expred groips
        try {
            const result = await Group.deleteMany( // delete group  whose 1)expiry date is exceeded(means expired product) and 2) status is still open
                { 
                    expiryDate: { $lt: new Date() }, 
                    status: "open" 
                }
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

    // Delete expired products
    static async deleteExpiredProducts() {
        try {
            const result = await Product.deleteMany({
                status: "open",   // delte all products which are open and either expired or bought
                $or: [  
                    { expiryDate: { $lt: new Date() } },
                    { boughtBy: { $exists: true, $not: { $size: 0 } } }
                ]
            });
            if (result.deletedCount > 0) {
                console.log(`✅ Deleted ${result.deletedCount} expired products`);
            } else {
                console.log('📅 No expired products found to delete');
            }
            return result;
        } catch (error) {
            console.error('❌ Error deleting expired products:', error);
        }
    }

    // Initialize all cron jobs
    static initializeCronJobs() {
        console.log('🚀 Initializing cron jobs...');
        
        // Run every hour at minute 0 (e.g., 1:00, 2:00, 3:00...)
        cron.schedule('0 * * * *', () => {
            console.log('⏰ Running hourly group and Product expiry check...');
            CronJobService.deleteExpiredGroups();
            CronJobService.deleteExpiredProducts();
        });

        // Optional: Run every day at midnight for cleanup
        cron.schedule('0 0 * * *', () => {
            console.log('🌙 Running daily group and Product expiry check...');
            CronJobService.deleteExpiredGroups();
            CronJobService.deleteExpiredProducts();
        });

        console.log('✅ Cron jobs initialized successfully');
    }

    // Manual trigger (useful for testing)
    static async manualExpiredGroupsUpdate() {
        console.log('🔧 Manual trigger: Updating expired groups...');
        return await CronJobService.deleteExpiredGroups();
    }
    static async manualExpiredProductsUpdate() {
        console.log('🔧 Manual trigger: Updating expired products...');
        return await CronJobService.deleteExpiredProducts();
    }
}
// will write own cronjob for deleting products after they are sold or expired
module.exports = CronJobService;