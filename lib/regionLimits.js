import { RateLimiterMemory }  from 'rate-limiter-flexible';
let regionMap = new Map();
export default function regionLimits(region)
{
  if(regionMap.has(region.id))
  {
    return regionMap.get(region.id);
  }
  else
  {
    const userNameOptions = {
      points: 3,
      duration: region.userNameTimer,
    };
    
    const signatureOptions = {
        points: 13,
        duration: region.signatureTimer,
      };
    
      
    
    const rateLimiter = new RateLimiterMemory(userNameOptions);
    const rateLimiterSign = new RateLimiterMemory(signatureOptions);
    let configs =  {rateLimiter,rateLimiterSign};
    regionMap.set(region.id,configs);
    return configs;

   
  }
    
}