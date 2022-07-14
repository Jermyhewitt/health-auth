import ConfigModel from "./configModel";
export default async function getRegionConfig(regionId)
{
    let configs = await ConfigModel.query().where("regionId", regionId);
    let configObject = {}
    configs.forEach(e=>{
        configObject[e.key]= e.value;
    });
    return configObject;
}
