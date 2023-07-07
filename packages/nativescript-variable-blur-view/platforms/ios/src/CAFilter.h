/**
 * https://github.com/nst/iOS-Runtime-Headers/blob/fbb634c78269b0169efdead80955ba64eaaa2f21/Frameworks/QuartzCore.framework/CAFilter.h#L5
*/

@interface CAFilter : NSObject <NSCopying, NSMutableCopying, NSSecureCoding> {
    void * _attr;
    void * _cache;
    unsigned int  _flags;
    NSString * _name;
    unsigned int  _type;
}

@property bool cachesInputImage;
@property (getter=isEnabled) bool enabled;
@property (copy) NSString *name;
@property (readonly) NSString *type;

+ (id)filterTypes;
+ (id)filterWithName:(id)arg1;
+ (id)filterWithType:(id)arg1;

- (void)setValue:(id)arg1 forKey:(id)arg2;
- (id)type;
- (id)valueForKey:(id)arg1;

@end